import {enableMapSet} from 'immer';
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { type C, comps } from "~/ecs/components";
import { E } from '~/ecs/entities';
import type { World } from '~/ecs/types';

enableMapSet();

const useECS = create<World>()(immer((set, get) => ({
    entities: new Map(),
    entitiesIdByComponent: new Map(),

    // Add entity to world
    addEntity: (entityId) => set((state) => {
      state.entities.set(entityId, new Map());
      console.info(`Entity ${E[entityId]} added`);
    }),

    // Remove entity from world
    removeEntity: (entityId) => set((state) => { 
      state.entities.delete(entityId);
      console.info(`Entity ${E[entityId]} removed`);
    }),

    // Add component to entity
    addComponent: (entityId, componentName) => set((state) => {
      const entity = state.entities.get(entityId);

      if (!entity) {
        console.error(`Entity ${E[entityId]} not found`);
        return;
      }

      if (typeof entity !== 'object') {
        console.error(`Entity ${E[entityId]} is not a valid map`);
        return;
      }

      if (entity.has(componentName)) {
        console.error(`Component ${componentName} already exists in Entity ${E[entityId]}`);
        return;
      }
      
      const newComponentValue = comps.get(componentName);
      entity.set(componentName, newComponentValue);

      if (!state.entitiesIdByComponent.has(componentName)) {
        state.entitiesIdByComponent.set(componentName, new Map());
      }

      state.entitiesIdByComponent.get(componentName)!.set(entityId, 0);

      console.info(`${componentName} added to ${E[entityId]}`);
    }),

    // Set new value to existed entity component
    setComponentValue: (entityId, componentName, componentValue) => set((state) => {
      const entity = state.entities.get(entityId);

      if (!entity) {
        console.error(`Entity ${E[entityId]} not found`);
        return;
      }

      if (entity.get(componentName) === undefined) {
        console.error(`Component ${componentName} not found`);
        return;
      }
      
      // @ts-ignore
      entity.set(componentName, componentValue);
      console.info(`${E[entityId]} ${componentName} set to: ${componentValue}`);
    }),

    // Remove component from entity
    removeComponent: (entityId, componentName) => set((state) => {
      if (state.entities.has(entityId)) {
        state.entities.get(entityId)!.delete(componentName);

        state.entitiesIdByComponent.get(componentName)!.delete(entityId);

        console.info(`${componentName} removed from ${E[entityId]}`);
      }
    }),

    // Check if entity has component
    hasComponent: (entityId, componentName) => {
      const entity = get().entities.get(entityId);
      return entity ? entity.has(componentName) : false;
    },

    // Query entities by specific components set
    query: ({include, exclude}) => {
      let shortestQuery: C | null = null;
      
      for (const included of include) {
        if (!get().entitiesIdByComponent.get(included)?.size) {
          return [];
        }

        if (!shortestQuery) {
          shortestQuery = included;
        } else {
          const includedSize = get().entitiesIdByComponent.get(included)?.size ?? Number.POSITIVE_INFINITY;
          const shortestQuerySize = get().entitiesIdByComponent.get(shortestQuery)?.size ?? Number.POSITIVE_INFINITY;

          if (includedSize < shortestQuerySize) {
            shortestQuery = included;
          }
        }
      }

      const shortestQueryEids = Array.from(get().entitiesIdByComponent.get(shortestQuery!)!.keys());
      const otherInclude = include.filter(included => included !== shortestQuery);

      let queried = shortestQueryEids.filter(eid => {
        return otherInclude.every(included => get().entitiesIdByComponent.get(included)?.has(eid))
      });

      if (exclude) {
        queried = queried.filter(eid => {
          return exclude.every(excluded => !get().entitiesIdByComponent.get(excluded)?.has(eid))
        })
      }

      return queried;
    },

    // deprecated: slower than state.query, caused by iteration for all entities
    // Query by all entities with specific components
    _queryAll: ({include, exclude}) => {
      const entities = Array.from(get().entities.entries());

      return entities.filter(([_, entity]) => {
        if (entity) {
          if (include) {
            if (exclude) {
              return include.every((componentName) => entity.has(componentName)) &&
                exclude.every((componentName) => !(entity.has(componentName)));
            }
            return include.every((componentName) => entity.has(componentName));
          }
          if (exclude) {
            return exclude.every((componentName) => !(entity.has(componentName)));
          }
        }
        return false;
      }).map(([eid]) => eid);
    },
})));

export default useECS;

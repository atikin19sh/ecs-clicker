import {enableMapSet} from 'immer';
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { type C, comps } from "~/ecs/components";
import { E } from '~/ecs/entities';
import type { Entity, World } from '~/ecs/types';

enableMapSet();

const useECS = create<World>()(immer((set, get) => ({
    entities: new Map<E, Entity>(), // Change from Array to Map

    // Add entity to world
    addEntity: (entityId: E) => set((state) => {
      state.entities.set(entityId, {});
      console.info(`Entity ${E[entityId]} added`);
    }),

    // Remove entity from world
    removeEntity: (entityId: E) => set((state) => { 
      state.entities.delete(entityId);
      console.info(`Entity ${E[entityId]} removed`);
    }),

    // Add component to entity
    addComponent: (entityId: E, componentName: C) => set((state) => {
      const entity = state.entities.get(entityId);

      if (!entity) {
        console.error(`Entity ${E[entityId]} not found`);
        return;
      }

      if (typeof entity !== 'object') {
        console.error(`Entity ${E[entityId]} is not a valid map`);
        return;
      }
      
      const newComponentValue = comps.get(componentName);
      entity[componentName] = newComponentValue;
      console.info(`${componentName} added to ${E[entityId]}`);
    }),

    // Set new value to existed entity component
    setComponentValue: (entityId: E, componentName: C, componentValue: Entity[C]) => set((state) => {
      const entity = state.entities.get(entityId);

      if (!entity) {
        console.error(`Entity ${E[entityId]} not found`);
        return;
      }

      if (entity[componentName] === undefined) {
        console.error(`Component ${componentName} not found`);
        return;
      }
      
      // @ts-ignore
      entity[componentName] = componentValue;
      console.log(`${E[entityId]} ${componentName} set to: `, componentValue);
    }),

    // Remove component from entity
    removeComponent: (entityId: E, componentName: C) => set((state) => {
      const entity = state.entities.get(entityId);
      if (entity) {
        delete entity[componentName];
        console.info(`${componentName} removed from ${E[entityId]}`);
      }
    }),

    // Check if entity has component
    hasComponent: (entityId: E, componentName: C) => {
      const entity = get().entities.get(entityId);
      return entity ? componentName in entity : false;
    },

    // Query entities with specific components
    query: ({include, exclude}: { include?: C[], exclude?: C[]}): E[] => {
      const entities = Array.from(get().entities.entries());

      return entities.filter(([_, entity]) => {
        if (entity) {
          if (include) {
            if (exclude) {
              return include.every((componentName) => componentName in entity) &&
                exclude.every((componentName) => !(componentName in entity));
            }
            return include.every((componentName) => componentName in entity);
          }
          if (exclude) {
            return exclude.every((componentName) => !(componentName in entity));
          }
        }
        return false;
      }).map(([eid]) => eid);
    },
  })))

  export default useECS;

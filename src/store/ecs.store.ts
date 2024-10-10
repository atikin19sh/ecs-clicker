import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { shallow } from 'zustand/shallow';
import type { C } from "~/ecs/components";
import { E } from '~/ecs/entities';
import type { AnyCompValue, CompValue, World } from '~/ecs/types';
import { buildComponent } from "~/ecs/utils";

const useECS = create<World>()(immer((set, get) => ({
    entities: [] as Record<C, AnyCompValue>[],

    // Add entity to world
    addEntity: (entityId: number) => set((state) => {
      state.entities[entityId] = {};
      console.info(`Entity ${E[entityId]} added`);
    }),

    // Remove entity from world
    removeEntity: (entityId: number) => set((state) => { 
      delete state.entities[entityId];
      console.info(`Entity ${E[entityId]} removed`);
    }),

    // Add component to entity
    addComponent: (entityId: number, componentName: C) => set((state) => {
      const entity = state.entities[entityId];

      if (!entity) {
        console.error(`Entity ${E[entityId]} not found`);
        return;
      }
      
      const newComponent = buildComponent(componentName);
      entity[componentName] = newComponent;
      console.info(`${componentName} added to ${E[entityId]}`);
    }),

    // Set new value to existed entity component
    setComponentValue: (entityId: number, componentName: C, componentValue: CompValue) => set((state) => {
      const entity = state.entities[entityId];

      if (!entity) {
        console.error(`Entity ${E[entityId]} not found`);
        return;
      }

      if (!entity[componentName]) {
        console.error(`Component ${componentName} not found`);
        return;
      }

      if (!shallow(Object.keys(entity[componentName]), Object.keys(componentValue))) {
        console.error(`Component ${componentName} has another type of value`);
        return;
      }

      entity[componentName] = componentValue;
      console.log(`${E[entityId]} ${componentName} set to: `, componentValue);
    }),
    
    // Remove component from entity
    removeComponent: (entityId: number, componentName: C) => set((state) => {
      const entity = state.entities[entityId];
      if (entity) {
        delete entity[componentName];
        console.info(`${componentName} removed from ${E[entityId]}`);
      }
    }),

    // Check if entity has component
    hasComponent: (entityId: number, componentName: C) => {
      const entity = get().entities[entityId];
      return entity ? componentName in entity : false;
    },

    // Query entities with specific components
    query: ({include, exclude}: { include?: C[], exclude?: C[]}): number[] => {
      const entities = get().entities;

      return entities.map((_, idx) => idx).filter(eid => {
        const entity = entities[eid];

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
      })
    },
  })))

  export default useECS;
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { UserStore } from './types';

const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set, get) => ({
        personalDetails: {
          username: '',
          id: ''
        },
        isUserLoggedIn: () => {
          if (get().personalDetails.username !== '') {
            return true;
          }
          return false;
        },
        logout: () => {
          localStorage.removeItem('user-store');
          set(
            {
              personalDetails: {
                username: '',
                id: ''
              }
            },
            false
          );
        },
        setPersonalDetails: personalDetails => {
          set(
            {
              personalDetails
            },
            false
          );
        }
      }),
      {
        name: 'user-store',
        partialize: state => {
          // only storing personalDetails in localStorage
          return {
            personalDetails: state.personalDetails
          };
        }
      }
    )
  )
);

export default useUserStore;

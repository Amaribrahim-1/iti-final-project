import { create } from 'zustand'
import { persist } from 'zustand/middleware'

function findWishlistItem(wishlist, id, mediaType) {
  return wishlist.find(
    (item) => item.id === id && item.media_type === mediaType,
  )
}

const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],

      toggleWishlist: (item, mediaType) => {
        const isItemExist = get().isInWishlist(item.id, mediaType)

        if (isItemExist) {
          get().removeFromWishlist(item.id, mediaType)
        } else {
          set({
            wishlist: [...get().wishlist, { ...item, media_type: mediaType }],
          })
        }
      },

      isInWishlist: (id, mediaType) => {
        return findWishlistItem(get().wishlist, id, mediaType) !== undefined
      },

      removeFromWishlist: (id, mediaType) => {
        set({
          wishlist: get().wishlist.filter(
            (item) => !(item.id === id && item.media_type === mediaType),
          ),
        })
      },
    }),
    {
      name: 'wishlist',
      partialize: (state) => ({ wishlist: state.wishlist }),
    },
  ),
)

export default useWishlistStore

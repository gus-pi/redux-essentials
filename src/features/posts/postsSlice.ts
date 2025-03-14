import { RootState } from '@/app/store'
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

// Define a TS type for the data we'll be using
export interface Post {
  id: string
  title: string
  content: string
  user: string
  date: string
}

type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>

// Create an initial state value for the reducer, with that type
const initialState: Post[] = [
  { id: '1', title: 'First Post!', content: 'Hello!', date: sub(new Date(), { minutes: 10 }).toISOString(), user: '0' },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    user: '2',
  },
]

// Create the slice and pass in the initial state
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: { id: nanoid(), title, date: new Date().toISOString(), content, user: userId },
        }
      },
    },
    postUpdated(state, action: PayloadAction<PostUpdate>) {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
})

// Export the generated reducer function
export default postsSlice.reducer

// Export the auto-generated action creator with the same name
export const { postAdded, postUpdated } = postsSlice.actions

export const selectAllPosts = (state: RootState) => state.posts

export const selectPostById = (state: RootState, postId: string) => state.posts.find((post) => post.id === postId)

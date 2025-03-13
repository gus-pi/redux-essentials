import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import PostsList from './features/posts/PostsList'
import { AddPostForm } from './features/posts/AddPostForm'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <section>
                <>
                  <AddPostForm />
                  <PostsList />
                </>
              </section>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App

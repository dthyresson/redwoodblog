// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/" page={HomePage} name="home" />
      <Route path="/about" page={AboutPage} name="about" />
      <Route path="/contact" page={ContactPage} name="contact" />

      <Route path="/blog-post/{id:Int}" page={BlogPostPage} name="blogPost" />

      <Private unauthenticated="home">
        <Route path="/settings" page={SettingsPage} name="settings" />
      </Private>

      <Private unauthenticated="home" role={['admin', 'author', 'publisher']}>
        <Route path="/admin/posts/new" page={NewPostPage} name="newPost" />
      </Private>

      <Private unauthenticated="home" role={['admin', 'editor', 'publisher']}>
        <Route
          path="/admin/posts/{id:Int}/edit"
          page={EditPostPage}
          name="editPost"
        />
      </Private>

      <Private
        unauthenticated="home"
        role={['admin', 'author', 'editor', 'publisher']}
      >
        <Route path="/admin/posts/{id:Int}" page={PostPage} name="post" />
        <Route path="/admin/posts" page={PostsPage} name="posts" />
      </Private>

      <Private unauthenticated="home" role="admin">
        <Route path="/admin/users" page={UsersPage} name="users" />
      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

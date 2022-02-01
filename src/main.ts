import Express from 'express'

import { usersRouter } from './routes/user.router'
import { postsRouter } from './routes/post.router'

const PORT = process.env.PORT || 8080

const app = Express()

app.use(Express.json())

app.use('/api', usersRouter)
app.use('/api', postsRouter)

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))

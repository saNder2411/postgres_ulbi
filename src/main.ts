import Express from 'express'

const PORT = process.env.PORT || 8080

const app = Express()

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))

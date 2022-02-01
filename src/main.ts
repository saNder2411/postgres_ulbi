import Express from 'express'

const PORT = process.env.PORT || 8080

const app = Express()

app.get('/', (req, res) => {
	res.send('Hello world!')
})

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))

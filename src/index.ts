import Fastify from "fastify";

const fastify = Fastify()

//Forma mais utilizada para declarar rotas no fastify
fastify.get("/", async () => {
    return { message: "Hello World" }
})

//Outra forma de declarar rotas no fastify
fastify.route({
    method: "GET",
    url: "/teste",
    handler: () => {
        return { message: "Hello World" }
    }
})

async function main() {
    try {
        const host = await fastify.listen({ port: 3000 })
        console.log(`Server listening on ${host}`)
    }
    catch (error) {
        console.error(error)
    }
}

main()

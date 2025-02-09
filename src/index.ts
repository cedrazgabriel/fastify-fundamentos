import Fastify, { FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";

const fastify = Fastify()

type Request = FastifyRequest<{
    Body: {
        name: string
    },
    Headers: {
        myCustomHeader: string
    },
    Querystring: {
        page: string,
    },
    Params: {
        id: string
    },
    Reply: {
        201: { id: string },
        '4xx': { code: string, message: string }
    }
}>

//Forma mais utilizada para declarar rotas no fastify
fastify.post("/", async (request: Request, reply) => {
    const {
        body,
    } = request // conseguimos pegar os dados da requisição

    reply.header("x-custom", "my-custom-header")

    if (!body.name) {
        reply.code(400)
            .send({
                code: 'VALIDATION_ERROR',
                message: "Name is required"
            })
        return
    }

    reply.code(201)
        .send({
            id: randomUUID()
        })

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

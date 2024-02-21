import prismaClient from "../prisma";
interface DeleteCustomerProps{
    id: string;
}

class DeleteCustomerService {
    async execute({ id }: DeleteCustomerProps){

        if(!id){
            throw new Error("Solicitação Invalida.");
        }

        const findCustumer = await prismaClient.customer.findFirst({
            where: { id: id }
        });

        if(!findCustumer){
            throw new Error("Cliente nao existe!");
        }

        await prismaClient.customer.delete({
            where: { id: findCustumer.id }
        });

        return { message: "Deletado com sucesso!" }

    }
}

export { DeleteCustomerService }
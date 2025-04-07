import { prismaClient } from "../application/database";
import { getContactValidation } from "../validation/contact-validation";
import { validate } from "../validation/validation";

const contactMustExist = async (user, contactId) => {
    contactId = validate(getContactValidation, contactId);

    const totalContact = await prismaClient.contact.count({
        where: {
            id: contactId,
            username: user.username
        }
    });

    if(totalContact !== 1) {
        throw new ResponseError(404, "Contact not found!");
    }

    return contactId;
}

const createAddress = async (user, contactId, request) => {
    contactId = await contactMustExist(user, contactId);

    const address = validate(createAddressValidation, request);
    address.contact_id = contactId;

    return prismaClient.address.create({
        data: address,
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    });
}

const getAddress = async (user, contactId, addressId) => {
    contactId = await contactMustExist(user, contactId);
    addressId = validate(getAddressValidation, addressId);

    const address = await prismaClient.address.findFirst({
        where: {
            id: addressId,
            contact_id: contactId
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    });

    if(!address) {
        throw new ResponseError(404, "Address not found!");
    }

    return address;
}

const updateAddress = async (user, contactId, request) => {
    contactId = await contactMustExist(user, contactId);
    const address = validate(updateAddressValidation, request);

    const totalAddressInDb = await prismaClient.address.count({
        where: {
            contact_id: contactId,
            id: address.id
        }
    });

    if(totalAddressInDb !== 1) {
        throw new ResponseError(404, "Address not found!");
    }

    return prismaClient.address.update({
        where: {
            id: address.id
        },
        data: {
            street: address.street,
            city: address.city,
            province: address.province,
            country: address.country,
            postal_code: address.postal_code
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
        
    })
}

const removeAddress = async (user, contactId, addressId) => {
    contactId = await contactMustExist(user, contactId);
    addressId = validate(getAddressValidation, addressId);

    const totalAddressInDb = await prismaClient.address.count({
        where: {
            contact_id: contactId,
            id: addressId
        }
    });

    if(totalAddressInDb !== 1) {
        throw new ResponseError(404, "Address not found!");
    }

    return prismaClient.address.delete({
        where: {
            id: addressId
        }
    });
}

const listAddress = async (user, contactId) => {
    contactId = await contactMustExist(user, contactId);

    return prismaClient.address.findMany({
        where: {
            contact_id: contactId
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    });
}

export default {
    createAddress,
    getAddress,
    updateAddress,
    removeAddress,
    listAddress
}
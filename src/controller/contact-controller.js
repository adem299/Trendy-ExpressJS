import contactService from "../service/contact-service.js";

const createContact = async (req, res, next) => {
    try {
        const user = req.user;
        const result = await contactService.createContact(user, req.body);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const getContact = async (req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId;
        const result = await contactService.getContact(user, contactId);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const updateContact = async (req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId;
        const request = req.body;
        request.id = contactId;

        const result = await contactService.updateContact(user, request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const removeContact = async (req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId;
        const result = await contactService.removeContact(user, contactId);
        res.status(200).json({
            data: "OK"
        });
    } catch (e) {
        next(e);
    }
}

const searchContact = async (req, res, next) => {
    try {
        const user = req.user;
        const request = {
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone,
            page: req.query.page,
            size: req.query.size
        }

        const result = await contactService.searchContact(user, request);
        res.status(200).json({
            data: result.data,
            paging: result.paging
        });
    } catch (e) {
        next(e);
    }
}

export default { 
    createContact,
    getContact,
    updateContact,
    removeContact,
    searchContact
};
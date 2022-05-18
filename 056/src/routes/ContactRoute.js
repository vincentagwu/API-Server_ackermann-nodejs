const ContactModel = require('../model/ContactModel')
const qs = require('qs')

module.exports = class ContactRoute {
  static getContacts (request, response) {
    // Initialize Variables
    let firstNameFilter, lastNameFilter, contactsArray

    // Variable which is containing the request with the search params
    const filter = qs.parse(request.query, { delimiter: '?' })

    // Condition, which checks if the request contains a param firstname or a part of a firstname
    if (typeof filter.firstName === 'object') { firstNameFilter = filter.firstName.contains } else if (filter.firstName !== undefined || filter.firstName !== null) { firstNameFilter = filter.firstName }

    // Checks if the request contains a param lastname or a part of a lastname
    if (typeof filter.lastName === 'object') { lastNameFilter = filter.lastName.contains } else if (filter.lastName !== undefined || filter.lastName !== null) { lastNameFilter = filter.lastName }

    // Checks if the previous condition have given the variables values
    if (firstNameFilter === undefined && lastNameFilter === undefined) {
      // No search param was given with
      contactsArray = ContactModel.getContacts()
    } else if (lastNameFilter === undefined) {
      // Only the firstname will be searched after the given search param
      contactsArray = ContactModel.getContacts().filter((contact) => {
        return (contact.firstName.includes(firstNameFilter))
      })
    } else if (firstNameFilter === undefined) {
      // Only the lastName will be searched after the given search param
      contactsArray = ContactModel.getContacts().filter((contact) => {
        return (contact.lastName.includes(lastNameFilter))
      })
    } else {
      contactsArray = ContactModel.getContacts().filter((contact) => {
        // Firstname and lastName will be searched after the given search param
        return (contact.firstName.includes(firstNameFilter) && contact.lastName.includes(lastNameFilter))
      })
    }

    response.send(contactsArray)
  }

  static findContact (request, response) {
    const { id } = request.params
    const contact = ContactModel.findContact(id)
    if (contact) {
      response.send(contact)
    } else {
      response.status(404).send('Contact not found.')
    }
  }

  static addContact (request, response) {
    const { id } = request.body
    const newContact = { ...request.body }
    delete newContact.id
    try {
      ContactModel.addContact(id, newContact)
      response.send(newContact)
    } catch (error) {
      response.status(409).send(error)
    }
  }

  static updateContact (request, response) {
    const { id } = request.params
    const updatedContact = { ...request.body }
    delete updatedContact.id
    try {
      ContactModel.updateContact(id, updatedContact)
      response.send(updatedContact)
    } catch (error) {
      response.status(404).send(error)
    }
  }

  static deleteContact (request, response) {
    const { id } = request.params
    const deleted = ContactModel.deleteContact(id)
    if (deleted) {
      response.status(200).send('deleted')
    } else {
      response.status(404).send('Contact not deleted.')
    }
  }
}

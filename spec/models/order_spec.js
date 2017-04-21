import Order from "src/models/order";

describe("Order", () => {

  it("extracts the person from json data", () => {
    const person = {
        "firstName": "Pascal",
        "lastName": "Widdershoven"
    }

    const order = new Order({
      "person": person,
      "dinner": []
    })

    expect(order.person).to.eql(person)
    expect(order.columns).to.eql({ "dinner": [] })
  })

})

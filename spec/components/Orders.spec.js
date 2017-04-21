import { h, render, options } from 'preact';

import Orders from "src/components/Orders";

describe("Orders component", () => {
  let scratch = document.createElement('div'),
    mount = jsx => root = render(jsx, scratch, root),
    root;

  afterEach( () => {
    mount(<nothing />);
    scratch.innerHTML = '';
  });

  it("shows a loading indicator", () => {
    mount(<Orders />)
    expect(scratch.querySelector('ul')).to.have.text('Loading orders...')
  })

})


import { h, Component } from "preact";
import styles from "./Orders.module.scss";

import Loader from "src/components/loader";
import DefinitionList from "src/components/DefinitionList";

import fetchOrders from "src/util/fetch-orders";
import { getCurrentUser } from "src/util/current-user";

const Order = function(props) {
  return (
    <li className={styles.item}>
      <p className={styles.user}>{props.order.person}</p>
      <DefinitionList data={props.order.columns} />
    </li>
  )
}

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { orders: null };

    fetchOrders().then(orders => {
      this.setState({ orders: orders });
    });
  }

  sortedOrders() {
    const currentUser = getCurrentUser();
    if(! currentUser)
      return this.state.orders;

    const orders = [...this.state.orders];
    orders.sort(function(a, b) {
      if(a.person == currentUser.name)
        return -1;
      else
        return 1;
    });

    return orders;
  }

  render() {
    return (
      <ul className={styles.container}>
        {
          this.state.orders
          && this.sortedOrders().map((order, index) => {
            return <Order order={order} key={index}/>
          })
          || <Loader message="Loading orders..."/>
        }
      </ul>
    );
  }
}

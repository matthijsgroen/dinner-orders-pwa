import { h, Component } from "preact";
import Loader from "src/components/loader";
import DefinitionList from "src/components/DefinitionList";
import styles from "./Orders.module.scss";
import fetchOrders from "src/util/fetch-orders";

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

  render() {
    return (
      <ul className={styles.container}>
        {
          this.state.orders
          && this.state.orders.map((order, index) => {
            return <Order order={order} key={index}/>
          })
          || <Loader message="Loading orders..."/>
        }
      </ul>
    );
  }
}

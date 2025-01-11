import { useFetcher } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import PropTypes from "prop-types";

// updateOrder.propTypes = {
//   order: PropTypes.shape({
//     orderItems: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         pizza: PropTypes.shape({
//           id: PropTypes.number.isRequired,
//           name: PropTypes.string.isRequired,
//           price: PropTypes.number.isRequired,
//         }).isRequired,
//       }),
//     ).isRequired,
//   }).isRequired,
// };

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

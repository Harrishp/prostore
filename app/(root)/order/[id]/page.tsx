import { getOrderById } from "@/lib/actions/order.actions";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import { ShippingAddress } from "@/types";
import { auth } from "@/auth";

export const metadata = {
  title: "Order Details",
  description: "Order Details",
};

const OrderDetailPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const { id } = params;
  const order = await getOrderById(id);
  if (!order) notFound();

  const session = await auth();

  return (
    <OrderDetailsTable
      order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddress,
        itemsPrice: order.itemsPrice.toString(),
        shippingPrice: order.shippingPrice.toString(),
        taxPrice: order.taxPrice.toString(),
        totalPrice: order.totalPrice.toString(),
        orderItems: order.orderItems.map((item) => ({
          price: item.price.toString(),
          name: item.name,
          slug: item.slug,
          image: item.image,
          productId: item.productId,
          qty: item.qty,
        })),
      }}
      paypalClientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb"}
      isAdmin={session?.user.role === "admin" || false}
    />
  );
};

export default OrderDetailPage;

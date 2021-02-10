import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Product = ({ prices, product }) => {
  const data = useStaticQuery(graphql`
    {
      allStripeProduct {
        nodes {
          localFiles {
            childrenImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  `)
  const stripe = window.Stripe(
    "pk_test_51IIzZ1IuQeLvyntSk4yli7ZpiP81KqDT2gUV7G68jO7uTz8GvjEK7JKBVsYuT8oD9b3TMsEqzgm8Zv2oOZ0unuUq008btTi33W"
  )
  const [price, setPrice] = useState(prices[0].node.id)

  //Use Price ID API key instead of SKU. Must have success and cancel URL or else error will be thrown. Must add "mode: 'payment'". when you run placeOrder in the onClick event 'price' gets passed in.

  const placeOrder = () => {
    stripe.redirectToCheckout({
      lineItems: [
        {
          price,
          quantity: 1,
        },
      ],
      mode: "payment",
      successUrl: "http://localhost:8000/success",
      cancelUrl: "http://localhost:8000/cancel",
    })
  }

  return (
    <article>
      <Img src={data.allStripeProduct.nodes.localFiles.childrenImageSharp} />
      <h3>{product.name}</h3>
      <select value={price} onChange={e => setPrice(e.target.value)}>
        {prices.map(edge => (
          <option key={edge.node.id} value={edge.node.id}>
            {edge.node.nickname}
          </option>
        ))}
      </select>
      <button onClick={placeOrder}>BUY THIS SHIT BLOOD</button>
    </article>
  )
}

export default Product

import React from "react"
import { useStaticQuery, graphql, StaticQuery } from "gatsby"

import Product from "./product"

const PRODUCTS_QUERY = graphql`
  query AllProducts {
    allStripePrice {
      edges {
        node {
          product {
            name
            id
          }
          id
          nickname
          unit_amount
        }
      }
    }
    allStripeProduct {
      edges {
        node {
          name
          id
        }
      }
    }
  }
`

const Products = () => {
  return (
    <StaticQuery
      query={PRODUCTS_QUERY}
      render={({ allStripePrice, allStripeProduct }) => {
        return allStripeProduct.edges.map(product => {
          const prices = allStripePrice.edges.filter(
            price => price.node.product.id === product.node.id
          )
          return (
            <Product
              key={product.node.id}
              prices={prices}
              product={product.node}
            />
          )
        })
      }}
    />
  )
}

export default Products

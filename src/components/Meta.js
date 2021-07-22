import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Bienvenido',
  description: 'Nosotros vendemos los mejores productos',
  keywords: 'electrónicos, comprar electronica , electronincos',
}

export default Meta

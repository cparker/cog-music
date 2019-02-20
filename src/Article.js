import React from 'react'


Article.defaultProps = {
    title: 'This is the default title'
}

export default function Article({ title }) {
  return <div>{title}</div>
}

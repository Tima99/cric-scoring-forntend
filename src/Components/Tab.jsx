import React from 'react'

const styles = {
    'tab-contain': {
        minWidth : "var(--tab-size)",
        minHeight: "auto",
        background: "#fff",
        display: "inline-flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        gap: '.5rem',
        color: '#333',
        boxShadow: "var(--shadow-light2)",
        textTransform: "uppercase",
        borderRadius: ".2rem",
        padding: ".5rem 0",
    },
    title: {
        fontSize: '.8rem',
        color: 'gray'
    }
}

export const Tab = ({text='', title=''}) => {
  return (
    <div style={styles['tab-contain']}>
        <span style={{fontWeight: 'bold', fontSize: '1.35rem'}}>{text}</span>
        <span style={styles['title']}>{title}</span>
    </div>
  )
}

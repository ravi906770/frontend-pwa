import React from 'react'
import ErrorBoundary from './ErrorBoundry'
import Buggy from './Buggy'
import FallBackUI from './FallbackUI'


type Props = {}

const Error = (props: Props) => {
  return (
    <>
   
   <h1>You are not Authenticated!!</h1>
    
    </>
  )
}

export default Error
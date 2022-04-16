import React, { useState } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import './App.less'

axios.interceptors.response.use((res) => {
  const { code } = res.data
  // 业务请求成功
  if (code >= 200 && code < 400) {
    return res.data
  }
  return Promise.reject(Error(`${ code }: 服务器异常~`))
}, (err) => Promise.reject(Error('网络异常，请稍后重试~')))

interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<(props: any) => JSX.Element>;
}

const routes = [
  {
    path: '/weather/',
    component: React.lazy(() => import('@/views/home/index')),
  }, {
    path: '/weather/detail/:location',
    component: React.lazy(() => import('@/views/detail/index')),
  },
]

export function withSuspense (element: React.LazyExoticComponent<(props: any) => JSX.Element>) {
  const CurrentElement = element
  return (
    <React.Suspense fallback={ <></> }>
      <CurrentElement />
    </React.Suspense>
  )
}

function lazyRender (config: RouteConfig) {
  const { path, component: LazyComponent } = config
  return (
    <Route key={ path } path={ path } element={ withSuspense(LazyComponent) } />
  )
}

function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          { routes.map((routeConfig) => lazyRender(routeConfig)) }
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

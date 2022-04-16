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
    path: '/',
    component: React.lazy(() => import('@/views/home/index')),
  }, {
    path: '/detail/:location',
    component: React.lazy(() => import('@/views/detail/index')),
  },
]

function lazyRender (config: RouteConfig) {
  const { path, component: LazyComponent } = config
  return (
    <Route key={ path } path={ path } element={ <LazyComponent /> } />
  )
}

function App () {
  return (
    <div className="App">
      <React.Suspense fallback={ <></> }>
        <BrowserRouter>
          <Routes>
            { routes.map((routeConfig) => lazyRender(routeConfig)) }
          </Routes>
        </BrowserRouter>
      </React.Suspense>
    </div>
  )
}

export default App

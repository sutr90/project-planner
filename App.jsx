import { hot } from 'react-hot-loader';
import React from 'react'
import { Layout } from 'antd';
import AppLayout from './AppLayout'

const { Header, Footer, Content } = Layout;

const App = () => (
  <Layout>
    <Header>Header</Header>
    <Content>
      <AppLayout />
    </Content>
    <Footer>Footer</Footer>
  </Layout>
)

export default hot(module)(App);

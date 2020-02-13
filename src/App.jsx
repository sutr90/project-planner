import { hot } from 'react-hot-loader';
import React from 'react'
import { Layout } from 'antd';
import AppLayout from './AppLayout';
import './global.scss';
import configureAppStore from './store/store';
import { Provider } from 'react-redux';
import FileMenu from './components/FileMenu';

const { Header, Content } = Layout;

const App = () => {

  const initialRows = JSON.parse(window.localStorage.getItem('rows')) || [{
    id: 0,
    name: "start",
    cost: 0,
    deps: [],
    note: "",
    locked: true,
    editable: false
  }];

  const store = configureAppStore({ rows: initialRows });

  return <Provider store={store}>
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Header><FileMenu /></Header>
      <Content>
        <AppLayout />
      </Content>
    </Layout>
  </Provider>
};

export default hot(module)(App);

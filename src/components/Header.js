import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Subscribe } from 'unstated';

import DataContainer from '../state/DataContainer';

const SubMenu = Menu.SubMenu;
const MenuGroup = Menu.ItemGroup;
const Item = Menu.Item;

class Header extends Component {
  render() {
    return (
      <header>
        <Subscribe to={[DataContainer]}>
          {({ setLongAsCurrent, setShortAsCurrent, syncToStorage }) => (
            <Menu mode="horizontal">
              <Item key="trash" onClick={this.props.showModal}>
                <Icon type="delete" />
                Trash Bin
              </Item>
              <Item key="save" onClick={syncToStorage} style={{ float: 'right' }}>
                <Icon type="save" />
                Persist data
              </Item>
              <SubMenu
                style={{ float: 'right' }}
                title={
                  <span>
                    <Icon type="database" />
                    Load Data
                  </span>
                }
              >
                <MenuGroup>
                  <Item key="short" onClick={setShortAsCurrent}>
                    Short JSON
                  </Item>
                  <Item key="long" onClick={setLongAsCurrent}>
                    Long JSON
                  </Item>
                </MenuGroup>
              </SubMenu>
            </Menu>
          )}
        </Subscribe>
      </header>
    );
  }
}

export default Header;

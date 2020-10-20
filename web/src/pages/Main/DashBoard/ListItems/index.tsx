import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { MdDashboard as DashboardIcon, MdAttachMoney } from 'react-icons/md';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon size={26} />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MdAttachMoney size={26} />
      </ListItemIcon>
      <ListItemText primary="Faturamento (*Pend)" />
    </ListItem>
  </div>
)

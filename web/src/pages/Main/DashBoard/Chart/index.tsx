import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import { ResponsiveContainer } from 'recharts';

import Title from '../Title';

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Gráfico</Title>
      <ResponsiveContainer>
       <div>
         Implements integrated click with grid...
       </div>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

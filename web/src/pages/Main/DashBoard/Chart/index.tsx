import React, { useEffect, useState } from 'react'
import { Cell, Legend, Pie, PieChart } from 'recharts'

import Machine from '../../../../models/Machine'
import Title from '../Title'


const STATECOLORS = ['#00C49F', '#f44336']

const data2 = [
  { name: '(*Pendente)', value: 95 },
  { name: '(*Pendente)', value: 25 }
]
const COLORS2 = ['#707070', '#cfcfcf']

interface ChartProps {
  machines: Machine[]
}

export default function Chart(props: ChartProps) {
  const [stateMachines, setStateMachines] = useState<
    {
      name: string
      value: number
    }[]
  >([])

  useEffect(() => {
    const arr = new Array({ name: 'Ligada(s)', value: 0 }, { name: 'Desligada(s)', value: 0 })
    props.machines.forEach(m => {
      m.instance_active === true ? arr[0].value++ : arr[1].value++
    })
    setStateMachines(arr)
  }, [props.machines])

  return (
    <>
      <Title>Gráficos</Title>
      <div
        style={{
          display: 'flex',
          flex: '1 1 auto',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center'
        }}
      >
        <div>
        <PieChart width={300} height={150}>
          <Pie data={stateMachines} innerRadius={30} outerRadius={50} fill="#8884d8" paddingAngle={0} dataKey="value" label={true}>
            {stateMachines.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={STATECOLORS[index % STATECOLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
        </div>
        <div>
        <PieChart width={300} height={150}>
          <Pie data={data2} innerRadius={30} outerRadius={50} fill="#8884d8" paddingAngle={0} dataKey="value" label={true}>
            {data2.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
        </div>
      </div>
    </>
  )
}

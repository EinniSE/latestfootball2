import React,{useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';

import axios from "axios";
import { TableRow } from '@mui/material';
import Avatar from "@mui/material/Avatar";

const options = {
  method: 'GET',
  url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
  params: {season: '2022', league: '39'},
  headers: {
    'X-RapidAPI-Key': '0bc4b32729msh34df65ede263326p18e11ajsn68e2f1de89df',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
};

const columns: GridColDef[] = [

  { field: 'rank', headerName: 'Rank', width: 90, sortable: false},
  { field: 'logo', headerName: 'Badge', width: 90, sortable: false, renderCell: (params)=>{
    return (
      <>
        <Avatar src={params.value} />
      </>
    )
  } },
  { field: 'team', headerName: 'Team', width: 150, sortable: false},
  { field: 'points', headerName: 'Points', width: 90 },
  { field: 'played', headerName: 'Played', width: 90},
  { field: 'won', headerName: 'Won', width: 90},
  { field: 'lost', headerName: 'Lost', width: 90},
  { field: 'drew', headerName: 'Drew', width: 90},
  { field: 'history', headerName: 'History', width: 90}
  
];

const rows = [

];

export default function DataGridDemo() {
 
  const [tableRows, setTableRows] = useState({});
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {

    axios.request(options).then(function (response) {
      
      let teams = response.data.response[0]['league']['standings'][0];

      let i = 1;

      let data = [];

      console.log('RAW DATA',teams);

      teams.forEach(team => {
        

        data.push({
          id: i,
          rank: team.rank,
          logo: team.team.logo,
          team: team.team.name,
          points: team.points,
          played: team.all.played,
          won: team.all.win,
          lost: team.all.lose,
          drew: team.all.draw,
          history: team.form
          
        })

        i++;
      });


      console.log('TABLE DATA WHAT TABLE WILL SEE', data);


      setTableRows(data);
      setShowTable(true);

     // setTableData(response.data.response);

    }).catch(function (error) {
        console.error(error);
    });

}, [])

  return (
    <div class="asdasd">
  <Box sx={{ height: 1000, width: '100%' }}>
      {
        showTable &&

        <DataGrid
        selectableRows={false}

        // density="compact" 
          rows={tableRows}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          
          disableColumnFilter 
          experimentalFeatures={{ newEditingApi: true }}

          disableColumnSelector
        />
      }
    
    </Box>
    </div>

    
  );
}

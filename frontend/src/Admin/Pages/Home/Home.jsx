import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import AdminRoutes from '../../../routes/AdminRoutes';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import ShopIcon from '@mui/icons-material/Shop';
import PeopleIcon from '@mui/icons-material/People';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import CardMedia from '@mui/material/CardMedia';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


const cards = [
  {
    id: 1,
    description: 'Welcome to Admin Dashboard',
  }
];



  // {
  //   id: 2,
  //   title: 'Animals',
  //   description: 'Animals are a part of nature.',
  // },
  // {
  //   id: 3,
  //   title: 'Humans',
  //   description: 'Humans depend on plants and animals for survival.',
  // },
  // {
  //   id: 4,
  //   title: 'Humans',
  //   description: 'Humans depend on plants and animals for survival.',
  // },
  // {
  //   id: 5,
  //   title: 'Humans',
  //   description: 'Humans depend on plants and animals for survival.',
  // },
function SelectActionCard() {
  const [selectedCard, setSelectedCard] = React.useState(0);
  return (
    <Box>
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
        gap: 2,marginLeft:25,marginTop:10,
      }}
    >
      {cards.map((card, index) => (
        <Card sx={{width:1100,fontFamily:'fantasy',backgroundColor:'white',marginLeft:10,marginTop:-6,":hover":{transform:"scale(1.05)",boxShadow:6,marginRight:10}}}>
          
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? '' : undefined}
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
          >
            
            <CardContent sx={{ height: '50',width:'100%',fontFamily:'fantasy',fontsize:40,display:'flex',marginLeft:35,fontSize:50}}>
            <DashboardIcon></DashboardIcon>
              <Typography variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" sx={{fontFamily:'fantasy', color:'orange',justifyContent:'center',display:'flex',fontSize:45}}>
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    
    </Box>
    <Box sx={{color:'blue',fontFamily:'fantasy',display:'flex',justifyContent:'center'}}><h1><AdminPanelSettingsIcon></AdminPanelSettingsIcon>ADMIN-ACTIVITIES</h1></Box>
      {/* <Box sx={{marginRight:20,marginLeft:40}}>
      <BarChart 
      series={[
        { data: [35, 44, 24, 34] },
        { data: [51, 6, 49, 30] },
        { data: [15, 25, 30, 50] },
        { data: [60, 50, 15, 25] },
      ]}
      height={290} width={1200}
      xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
        </Box> */}
        <Box sx={{display:'flex',marginTop:10}}>
        <Box >
         <Card sx={{ maxWidth: 345,marginLeft:35,":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardActionArea>
        <CardMedia
         
          height="140"
      
        />
        <CardContent sx={{fontfamily:'fantasy'}}>
          <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
            <ShopIcon></ShopIcon> ADD SELLER
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' ,fontFamily:'fantasy'}}>
            Admins can verify and reject Sellers 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        
      </CardActions>
    </Card>
    </Box>
    <Box  >
    <Card sx={{ maxWidth: 345,marginLeft:25,":hover":{transform:"scale(1.05)",boxShadow:6 }}}>
      <CardActionArea>
        <CardMedia
         
          height="140"
      
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
           <StoreIcon></StoreIcon> ADD SHOP
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary',fontFamily:'fantasy' }}>
          Admins can verify and reject Shop
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      
      </CardActions>
    </Card>
    </Box>
    <Box>
    <Card sx={{ maxWidth: 345,marginLeft:25,":hover":{transform:"scale(1.05)",boxShadow:6 } }}>
      <CardActionArea>
        <CardMedia
         
          height="140"
      
        />
        <CardContent sx={{fontfamily:'fantasy'}}>
          <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
          <PeopleIcon></PeopleIcon>STORE CUSTOMER
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' ,fontFamily:'fantasy'}}>
            Admins can User Information
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        
      </CardActions>
    </Card>
    </Box>
    </Box>
    <Box sx={{display:'flex',marginTop:2}}>
        <Box >
         <Card sx={{ maxWidth: 345,marginLeft:35,":hover":{transform:"scale(1.05)",boxShadow:6 }}}>
      <CardActionArea>
        <CardMedia
         
          height="140"
      
        />
        <CardContent sx={{fontfamily:'fantasy'}}>
          <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
            <PeopleIcon></PeopleIcon>ADD AGENT
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' ,fontFamily:'fantasy'}}>
            Admins can verify and reject  Agent
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
      </CardActions>
    </Card>
    </Box>
    {/* <Box  >
    <Card sx={{ width:240,marginLeft:25 ,":hover":{transform:"scale(1.05)",boxShadow:6,backgroundColor:'grey' }}}>
      <CardActionArea>
        <CardMedia
         
          height="140"
      
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
            <AdminPanelSettingsIcon></AdminPanelSettingsIcon>ADD ADMIN
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary',fontFamily:'fantasy' }}>
          Admins can add new Admin
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
       
      </CardActions>
    </Card>
    </Box>
    <Box>
   
    </Box> */}
    </Box>
        </Box>
  );

}

export default SelectActionCard;

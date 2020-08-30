import React, { Component } from 'react';
import logo from '../../../pics/logo.png';
import './construction.css';

class ConstructionPage extends Component{
   
    render(){
        return(
           <div className='construction-page'>
               <div id='intro-text'>
               This site is in construction. We are getting ready to empower Venezuelans and enable them to request support from abroad through a decentralized peer-to-peer transactions platform. The first platform of its kind, Yakera will provide fundraising to those who need the most help in Venezuela.<br /><br />

                Esta página se encuentra en construcción. Estamos preparándonos para empoderar a los venezolanos y darles la oportunidad de pedir apoyo del exterior a través de un sistema descentralizado de transacciones peer-to-peer. Como primera plataforma de su naturaleza, Yakera proveerá la oportunidad de recolectar fondos a aquellos que necesitan más ayuda en Venezuela. 
               </div>

               <hr style={{margin:'50px 100px'}}/>

               <div id='description'>
               Yakera—gratitude in Warao—aims to change the Venezuelan reality by providing a safe and vetted pathway to achieve inclusive support that does not discriminate for political membership, targets an otherwise excluded country in crisis from fundraising, stimulates the local economy, avoids institutional corruption, and allows donors and recipients to engage with Yakera at a fair exchange rate using the currency that best meets their needs. Yakera focuses on those who are overlooked by foreign aid and government institutions to help them transition from survival to resilience. The platform focuses on international citizens ready to lend a hand to Venezuelans who are struggling to put a plate of food on the table, keep their business open, buy school supplies for their children, or purchase medicine for their abuelas. Yakera creates a dignified, personalized path to secure the goods and services they deserve, fueled by fellow human beings, providing a bit of security and a sense of empowerment.
                <br /><br />
                Yakera—gratitud en warao—tiene como objetivo cambiar la realidad venezolana proveyendo una opción segura y transparente que permite a los venezolanos acceder apoyo sin importar su afiliación política. Yakera se enfoca en un país que ha sido excluido de plataformas de fundraising, estimula la economía local, evita la corrupción institucional y permite a donantes y aquellos que necesitan apoyo utilizar la moneda y el método de pago o retiro que más les convenga. Yakrea se enfoca en aquellos listos para extender una mano a venezolanos luchando por poner un plato de comida en la mesa, mantener sus negocios abiertos, comprar útiles para sus hijos, o comprar medicina para sus abuelas. Yakera crea un camino digno y personalizado para obtener los bienes y servicios que los venezolanos se merecen con el apoyo de otros seres humanos, proveyendo seguridad y empoderamiento a aquellos que utilizan nuestra plataforma.

               </div>
               
               <div id='construction-logo'>
                   <img src={logo} alt='logo' />
               </div>

               <hr style={{clear:'both', margin:'50px 100px'}}/>

               <div id='construction-content'>
               Venezuela by the Numbers:<br /><br />

                79.3%<br /><br />
                The percentage of Venezuelans living in extreme poverty according to the 2020 Encuesta de Condiciones de Vida. 96.2% are considered poor or in poverty. <br /><br />

                Over 5 million people have left the country due to the economic catastrophe and the unstable political situation.<br /><br />

                24 Lbs.<br /><br />
                Average weight loss per capita since the beginning of the economic crisis. <br /><br />

                1<br /><br />
                The number of crowdfunding platforms capable of providing anonymous, non-inflated, direct cash transfers to Venezuelans in need. Spoiler alert, it’s us.<br /><br />


                Our path forward:<br /><br />
                In December of this year, we will conduct a community trial through our local partner, Nutriendo el Futuro, in the community of El Calvario, El Hatillo, in the capital city of Venezuela. There, we will support 12 families in making their fundraising campaigns within the categories of food, small businesses, education, and healthcare and sponsor three community projects focused on the pressing needs of El Calvario. In order to envision the future implementation and expansion of Yakera, we will monitor our impact and record relevant data which will allow us to improve the user experience in certain areas and generate compelling results. At the moment, we are requesting support in GoFundMe to cover the costs associated with the remote implementation and the “A-Naruna Community Fund” which will make funds available to match donations at this stage and incentivize those who are requesting support to contact their family members or friends abroad to donate to their campaigns.<br /><br />


                Nuestra ruta:<br /><br />
                En diciembre de este año, realizaremos un ensayo comunitario a través de nuestro socio local, Nutriendo el Futuro, en la comunidad de El Calvario, El Hatillo, en la capital de Venezuela. Allí, apoyaremos a 12 familias en la realización de sus campañas de recaudación de fondos dentro de las categorías de alimentos, pequeñas empresas, educación y salud y patrocinaremos tres proyectos comunitarios enfocados en las necesidades apremiantes de El Calvario. Con el fin de imaginar la futura implementación y expansión de Yakera, monitorearemos nuestro impacto y registraremos datos relevantes que nos permitirán mejorar la experiencia del usuario en ciertas áreas y generar resultados convincentes. Por el momento, estamos solicitando apoyo en GoFundMe para cubrir los costos asociados con la implementación remota y el Fondo Comunitario A-Naruna que har[a fondos disponibles para igualar las donaciones en esta etapa e incentivar a aquellos que están solicitando apoyo a ponerse en contacto con sus familiares o amigos en el extranjero para donar a sus campañas.


               </div>

               <hr style={{margin:'50px 100px'}}/>

               <div id='construction-partners'>
               Our partners:<br /><br />
                AirTm<br /><br />
                Nutriendo el Futuro<br /><br />
                Rotaract Caracas

               </div>

               
           </div>
           
        )
    }
}

export default ConstructionPage;
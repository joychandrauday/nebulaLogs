import { Helmet } from 'react-helmet-async'
import HomeElements from '../../components/Home/HomeElements'
import BannerElements from '../../components/Home/BannerElements'

const Home = () => {
  return (
    <div className='' style={{
      backgroundImage: 'url("")',
    }}>
      <Helmet>
        <title>Nebula Logs | your daily activities in our logs. </title>
      </Helmet>
      <BannerElements />
    </div>
  )
}
export default Home

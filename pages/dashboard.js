import { getSession } from 'next-auth/react';
import axios from 'axios';
import nookies from 'nookies';
import { Bar } from 'react-chartjs-2';

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const token = cookies['auth-token'];

  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const { email } = session.user;

  // Puxar dados do Xano usando o email e token
  const res = await axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:spr2iDvK/diagnostico_gestao_de_viagens`, {
    params: { email, token },
  });

  const data = res.data;

  return {
    props: { data },
  };
}

function Dashboard({ data }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Dataset',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: data.values,
      },
    ],
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Bar data={chartData} />
    </div>
  );
}

export default Dashboard;

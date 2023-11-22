import React, { useState } from 'react';
import Basic from '../modules/basic';
import Homenav from '../components/Homenav';

function Viewmorefollowers({ followers,close}) {
  const basic = new Basic();
  const [displayedFollowers, setDisplayedFollowers] = useState(4);

  const loadMoreFollowers = () => {
    setDisplayedFollowers((prevCount) => prevCount + 4);
  };

  return (
    <div>
      <Homenav />
	  <button onClick={()=>close(false)}>close popup</button>
      <h1 className="text-center text-2xl font-bold mb-4">All Followers</h1>
      <div className="w-full flex flex-wrap justify-center gap-4 my-10 px-4">
        {followers?.slice(0, displayedFollowers).map((each_follower) => (
          <div key={each_follower.id} className="w-[90%] sm:w-[200px] border rounded-md min-h-[200px] bg-white p-4">
            <img className="w-[100px] h-[100px]  object-cover rounded-[100vh]" src={each_follower.profile} alt={each_follower.name} />
            <p className="mt-2">{basic.truncate(each_follower?.name)}</p>
            <button
              className="mt-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
              onClick={() => basic.redirect_user(`user-profile/${each_follower?.name}/${each_follower?.id}`)}
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
      {followers?.length > displayedFollowers && (
        <div className="text-center">
          <button
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark"
            onClick={loadMoreFollowers}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default Viewmorefollowers;

import React from "react";
import { Link } from "react-router-dom";
import './TeamLogos.css'
import './ShopByTeams.css'

const TeamLogos = () => {
  return (
    <div>
      <div className="cardscd1">
        <div className="card-images-shopByteams">
          <Link to={"/InterMiami"}>
            <img 
              src="https://dukaan.b-cdn.net/500x500/webp/media/390e4bfa-a7e7-46c3-844a-8fd0e3b3b12b.png"
              captio
              alt="Inter Miami"
            />
          </Link>
        </div>
        <div className="card-images-shopByteams">
          <Link to={"/RealMadrid"}>
            <img
              src="https://dukaan.b-cdn.net/500x500/webp/media/f365e11f-e6ab-4c07-853c-344cf96aedd8.png"
              alt=""
            />
          </Link>
        </div>
        <div className="card-images-shopByteams">
          <Link to={"/Arsenal"}>
            <img
              src="https://dukaan.b-cdn.net/500x500/webp/media/6fd94f41-d702-4b50-97dc-e02722e1e9a3.png"
              alt=""
            />
          </Link>
        </div>
        <div className="card-images-shopByteams">
          <Link to={"/ManchesterUnited"}>
            <img
              src="https://dukaan.b-cdn.net/500x500/webp/media/c69c2fbf-8c64-4a51-9062-6ccbe0c49688.png"
              alt=""
            />
          </Link>
        </div>
        <div className="card-images-shopByteams">
          <Link to={"/Liverpool"}>
            <img
              src="https://dukaan.b-cdn.net/500x500/webp/media/943eb4ab-81ae-4d2f-9aaf-80c90f0e0a62.png"
              alt=""
            />
          </Link>
        </div>
        <div className="card-images-shopByteams">
          <Link to={"/Bayern"}>
            <img
              src="https://dukaan.b-cdn.net/500x500/webp/media/b64125e0-7e36-405e-bd76-465e0d96b007.png"
              alt=""
            />
          </Link>
        </div>
        <div className="card-images-shopByteams">
          <Link to={"/Alnassar"}>
            <img
              src="https://dukaan.b-cdn.net/500x500/webp/media/75a8a48c-e82a-4878-9e94-958282ea6d2c.png"
              alt=""
            />
          </Link>
        </div>
        <div className="card-images-shopByteams">
          <Link to={"/Barcelona"}>
            <img
              src="https://dukaan.b-cdn.net/500x500/webp/media/62d899ff-1ef1-496a-8411-f182c8839fdb.png"
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamLogos;

import React, {useEffect, useContext} from "react";
import Layout from "../components/Layout/Layout";
import VideoDetail from "../components/VideoDetail/VideoDetail";
import SideList from "../components/SideList/SideList";
import {Store} from "../store";
import {useLocation} from "react-router-dom"
import {fetchSelectedData, fetchRelatedData} from "../apis";

const Watch = () => {
  const {setGlobalState} = useContext(Store);
  const location = useLocation();
  const setVideo = async ()=>{
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("v");
    if(id){
      const [selected, related] = await Promise.all([fetchSelectedData(id),fetchRelatedData(id)]) //この二つの非同期処理に依存関係はないので、同時に処理する
      setGlobalState({type: "SET_SELECTED", payload: {selected: selected.data.items.shift()}})
      console.log(selected.data.items)
      setGlobalState({type: "SET_RELATED", payload: {related: related.data.items}})
    }
  }

  useEffect(()=>{
    setVideo()
  },[location.search]) //クエリパラメータに変化あるたびに呼び出す


  return (
    <Layout>
        <VideoDetail/>
        <SideList/>
    </Layout>
  );
}

export default Watch;

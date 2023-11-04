import hashMaker from 'lib/hashMaker';
import supabase from '.';

const uploadSpot = async ({
  lat,
  lng,
  title,
  creator,
  caption,
  thumbnailImage,
}) => {
  // marker
  const markerId = hashMaker();
  const thumbnailImageId = hashMaker();
  const markerDb = {
    // (규칙): 값을 공백으로 지정해야 할시는 ''로 저장함
    lat: lat,
    lng: lng,
    markerId: markerId,
    thumbnailImageId: thumbnailImageId,
    thumbnailImageUrl: thumbnailImage,
    creator: creator,
  };
  const { data: uploaMarkerdDb, error: uploadMarkerDbError } = await supabase
    .from('markers')
    .insert(markerDb);
  if (uploaMarkerdDb) {
    throw new Error('file을 db에 업로드중 오류 발생');
  }
  // post
  const postDb = {
    // (규칙): 값을 공백으로 지정해야 할시는 ''로 저장함
    lat: lat,
    lng: lng,
    markerId: markerId,
    thumbnailImageId: thumbnailImageId, // 같은 거 저장하는 이유는 마커는 그냥 피드에 표시됨. 근데 게시물은 ?p=markerId 로 언제든지 접근 가능하기에 지도상에 뿌려줘야 하니까 마커 정보 다 필요해요! 마커만 있는 이유는 정보 빨리 가져오기 위함이에요!
    thumbnailImageUrl: thumbnailImage,
    creator: creator,
  };
  const { data: uploadPostDb, error: uploadPostDbError } = await supabase
    .from('markers')
    .insert(postDb);
  if (uploadPostDb) {
    throw new Error('file을 db에 업로드중 오류 발생');
  }

  return [markerDb, postDb];
};

export default uploadSpot;

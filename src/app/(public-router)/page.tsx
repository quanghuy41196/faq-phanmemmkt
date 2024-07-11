import BoxItem from "./(components)/BoxItem";

const listBox = [
  {
    src: "https://img001.prntscr.com/file/img001/Hayfw6EOSTGL1HdaP5C-HA.png",
    title: "Công nghệ",
  },

  {
    src: "https://img001.prntscr.com/file/img001/vpbyRA0qQOOAzO9koPBvBQ.png",
    title: "Mạng xã hội",
  },

  {
    src: "https://s3-alpha-sig.figma.com/img/127d/05f9/b6c8a08ec45e0736465aad1c02029eda?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hLauns9-wId1PHoyhmuDyIzujUg7KV7tDir5kmMEQhi1ZMtg3iJJQGtlDRvB0SGpP56CeJKbWWw8PN-seW-xyJqccWBGytpL8xVSN3EQiMJryWWIrSVb-aH1Us7GRj6T--fWzsuzBBnoV3r427AO9AkodCb65fb9IfRVBCs4NRB3msHsrBXYCtTdHlBiAp-KoNXySi7BLIiVpMWC97seO0~o7re6HWx~dv8kzorXN9FkGy2ZbIOZHeRdZgcgmPUuaPHTESOfth3PxRsbbJzTdpvRaetZsqiikPcNQGiNnnP93jlzEoVTXejd6sp6Osaz0SnuQ4dVUaBSV~HcRt1A3w__",
    title: "Marketing 0đ",
  },

  {
    src: "https://s3-alpha-sig.figma.com/img/9ce2/70ee/f9bb628b317e39462c23d906a1ee0d42?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p1W34Nbv1ELYcQ~AA3E4yNYowqPc2MlUOkWS2tLa0~crO2uc4T7SMr517WCiQMAp-dG-CYE-ea5Ir-cURvU3bT93jvSvRfhGpyYt5eV7TwwvOGCuAuq62kwQ2nwbieFJXUS2kVZcYJcrbLeTi7CrTwvgksvoE9dHiL-g9RfzleZ8-wzUZ2k~VpcXgLNeq3dh77nuiew3kTjVuCp5VNztFuh8x~O95NQHh0piqqbBWlzmLaxqO9yLhKq-cmLOtO6a6J9MpZ1~TaHrdtH4OL~peMU1LkwTAKehcZQB8C5Q62oqekoql0MB9ABCtSj4F8OQM4r-uiFxotGrdUpGa11EdQ__",
    title: "Phần mềm MKT",
  },

  {
    src: "https://s3-alpha-sig.figma.com/img/f10d/720b/23e0eca221c617e4aa2c6fd80165c9ef?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oQQxllgZ6KIGyw6E~rGQEWl-ebmh0hNs9JWDjAKw9ZC~gcv7yG6ALdNMrBq~UjFKQRywQGmJj5ErsaqP-0-rnmz16ITcocSnRgN2Tv-au8TAfspKGg~PdEeuMPaUqCF1NTEY3injbuNA9LAAvY9y1WuQ9oTgDuFfs~4Irse9pnXdOPfTKW9v294poucMJS4QHFhJQOUokB3wERWoJyX2ERiRDj5T0Jh14yIYDnO7RvBhfQvXbVIoJrZ2vniWA6RhG2mGhvPUkdCgHbtFkh24LqPfJx55pNMqF93Vu6mszopt7JzeWRKr61rgxtdJzcbS38IORko4ip5gmOCdfKBJPw__",
    title: "AI",
  },

  {
    src: "https://s3-alpha-sig.figma.com/img/a533/263b/39941e916f914247b041b867e1907d93?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CroXi~NPyRmzhQHYsWr570kWfI8QkWv3Sc1woL3tPMJlCJ6fiyUeLmgo4AFRTH2r2DpYzY1g4o24giyAlL0R54BuySZR~k97-uySxAC39aH3YfmNsmkWuMWO5mnrLV74dgxFzteH4jBwYejoYxy~jB-kJQGpbTVs8EZRUcAyr~7X68-wJjhjPBXbYxHUVzGkkAA9pPyuTnaCmvCJfsrKFvAgz0HmFQShQQpndedt2kfJ31wUDxKJ6zcHlXWpUAUckFkE0MsdgvopmlhEtK089X~BEKvamaAW2Ug5GIGCOjp9Z~AwY-lY3GrRTws4-eLHiH6XQ2-qKH2MifkT8j3ORQ__",
    title: "Khởi nghiệp",
  },
];

const HomePage = () => {
  return (
    <div className="flex mt-3">
      <div className="grid grid-cols-3 gap-5">
        {listBox.map((item, index) => (
          <BoxItem key={index} src={item?.src} title={item?.title} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

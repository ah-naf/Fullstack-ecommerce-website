import React from "react";
import { Pagination, Grid } from "@nextui-org/react";
import './Pagination.css'

export default function Pagination_page({setCurrentPage, currentPage, total}) {

  return (
    <div className="pagination-container">
      <Grid.Container gap={2} justify={'center'} style={{width: '100%'}}>
        <Grid xs={12} style={{width: '100%'}} justify={'center'}>
          <Pagination loop shadow color={'primary'} total={total}  page={currentPage} onChange={setCurrentPage}  />
        </Grid>
        
      </Grid.Container>
    </div>
  );
}

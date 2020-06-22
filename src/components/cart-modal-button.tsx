import { Backdrop, Fade, IconButton, Modal, Paper } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React, { useState } from 'react';
import tw from 'twin.macro';

const CartModalButton = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <ShoppingCartIcon color="action" />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        css={[tw`flex justify-center items-center`]}
      >
        <Fade in={open}>
          <Paper>
            <h2 id="transition-modal-title">Cart</h2>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
};

export default CartModalButton;

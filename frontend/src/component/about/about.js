import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-20 text-center">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyHRDjiBpwJp8XpSH8baZh6dawIWTOZZB42MglG0hNCDmsrk70xVE-SRmYZ7qSbNRXGos&usqp=CAU"
              alt="About Us"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              blandit quam vitae libero blandit, a lacinia purus eleifend.
              Phasellus id mauris et odio feugiat semper in eu urna. Ut porta
              neque eu erat facilisis, vitae consequat lectus gravida. Sed
              vestibulum dolor quis justo sagittis, sed faucibus nunc congue.
              Nulla facilisi. Nam nec felis non purus vestibulum vulputate
              eget vitae magna. In vel sem non mauris tempus aliquet nec in
              nisi. Sed mattis neque a metus elementum, in dignissim nisi
              interdum. Nulla facilisi. Praesent consectetur metus vel justo
              scelerisque, vel tincidunt turpis dapibus.
            </p>
            <p className="text-lg">
              Fusce id urna ultricies, aliquet leo vel, interdum purus. Nullam
              in fringilla neque. Sed sed risus et nunc blandit hendrerit
              ac vel arcu. Phasellus sed sapien nec est sodales eleifend non
              non eros. Nullam eget rhoncus purus. Ut vehicula urna nec eros
              vehicula blandit. Ut a dui eget enim pretium auctor. Phasellus
              tempus, sapien sit amet sodales volutpat, eros ante pretium sem,
              sit amet consectetur est magna sit amet est. Morbi non nunc
              rhoncus, pharetra ipsum eu, ultrices justo. Mauris a felis nec
              nunc elementum bibendum nec eu dui. Nullam tincidunt enim at
              ligula ullamcorper, sed laoreet lacus scelerisque.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

<template>
  <b-container
    fluid
    class="px-0"
  >
    <!-- START - NavBar -->
    <b-navbar variant="light">
      <b-navbar-brand
        href="#"
        class="d-md-none d-flex"
      >
        <b-icon-list
          font-scale="1"
        />
      </b-navbar-brand>
      <b-navbar-brand
        href="#"
        class="d-none d-md-flex"
      >
        SaleMT
      </b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <!-- START - Contact -->
        <b-row
          class="mx-0 d-none d-xl-flex"
          align-v="center"
        >
          <b-icon
            icon="telephone-fill"
            font-scale="1.5"
          />
          <b-col>
            <div class="d-flex justify-content-center text-primary">
              1900 8098
            </div>
            <div class="d-flex justify-content-center text-lowercase">
              ch.support@vinamilk.com.vn
            </div>
          </b-col>
        </b-row>
        <!-- END - Contact -->

        <!-- START - Location -->
        <b-row
          class="mx-0 ml-1 d-none d-lg-flex"
          align-v="center"
        >
          <b-icon
            icon="geo-alt-fill"
            font-scale="1.5"
          />
          <b-col>
            <div class="d-flex justify-content-center text-uppercase">
              Cửa hàng
            </div>
            <div class="d-flex justify-content-center text-capitalize">
              Số 33 Đinh Tiên Hoàng, P. Đa Kao, Q. 1
            </div>
          </b-col>
        </b-row>
        <!-- END - Location -->

        <!-- START - Icon group -->
        <b-row
          class="mx-0 row-cols-2"
          align-v="center"
        >
          <b-nav-item>
            <b-icon
              icon="arrow-repeat"
              font-scale="1.5"
            />
          </b-nav-item>
          <b-nav-item>
            <b-icon
              icon="bell-fill"
              font-scale="1.5"
            />
          </b-nav-item>
        </b-row>
        <!-- END - Icon group -->

        <!-- START - Profile -->
        <b-nav-item>
          <b-row
            class="mx-0"
            align-v="center"
          >
            <b-nav-text class=" d-none d-sm-flex text-capitalize mr-1 font-weight-bold text-dark">
              Ngô Thị Lan hương
            </b-nav-text>
            <b-icon
              icon="person-circle"
              font-scale="2"
              class="rounded-circle"
            />
          </b-row>
        </b-nav-item>
        <!-- END - Profile -->
      </b-navbar-nav>
    </b-navbar>
    <!-- END - NavBar -->

    <!-- START - Nav -->
    <b-nav class="d-none d-md-flex bg-primary">
      <b-nav-item class="mx-2">
        <b-icon
          icon="gear-fill"
          font-scale="1.5"
          color="white"
        />
        <b-nav-text class="text-white  ml-1">
          Hệ thống
        </b-nav-text>
      </b-nav-item>

      <b-nav-item class="mx-2">
        <b-icon
          icon="cart-fill"
          font-scale="1.5"
          color="white"
        />
        <b-nav-text class="text-white  ml-1">
          Bán hàng
        </b-nav-text>
      </b-nav-item>

      <b-nav-item class="mx-2">
        <b-icon
          icon="cart-fill"
          font-scale="1.5"
          color="white"
        />
        <b-nav-text class="text-white  ml-1">
          Mua hàng
        </b-nav-text>
      </b-nav-item>

      <b-nav-item class="mx-2">
        <b-icon
          icon="archive-fill"
          font-scale="1.5"
          color="white"
        />
        <b-nav-text class="text-white  ml-1">
          Kho
        </b-nav-text>
      </b-nav-item>

      <b-nav-item class="mx-2">
        <b-icon
          icon="graph-up"
          font-scale="1.5"
          color="white"
        />
        <b-nav-text class="text-white ml-1">
          Báo cáo
        </b-nav-text>
      </b-nav-item>
    </b-nav>
    <!-- END - Nav -->

  </b-container>
</template>

<script>
export default {
  name: 'AppNavbar',
}
</script>

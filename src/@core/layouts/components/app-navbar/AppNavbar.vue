<template>
  <div class="d-flex flex-column">
    <!-- START - NavBar -->
    <b-navbar
      id="v-navbar"
      type="light"
    >
      <b-navbar-brand
        id="v-brand-text"
        href="#"
      >
        SaleMT
      </b-navbar-brand>

      <b-navbar-nav class="d-flex flex-row ml-auto">
        <!-- START - Contact -->
        <div class="d-flex flex-row align-items-center mr-2">
          <b-icon
            icon="telephone-fill"
            width="25"
            height="25"
            class="mr-1"
          />
          <div class="d-flex flex-column align-items-center">
            <b-nav-text class="text-primary">
              1900 8098
            </b-nav-text>

            <b-nav-text class="text-lowercase">
              ch.support@vinamilk.com.vn
            </b-nav-text>
          </div>
        </div>
        <!-- END - Contact -->

        <!-- START - Location -->
        <div class="d-flex flex-row align-items-center  mr-2">
          <b-icon
            icon="geo-alt-fill"
            width="25"
            height="25"
            class="mr-1"
          />
          <div class="d-flex flex-column  align-items-center">
            <b-nav-text class="text-uppercase">
              Cửa hàng
            </b-nav-text>
            <b-nav-text class="text-capitalize">
              Số 33 Đinh Tiên Hoàng, P. Đa Kao, Q. 1
            </b-nav-text>
          </div>
        </div>
        <!-- END - Location -->

        <!-- START - Icon group -->
        <div class="d-flex flex-row align-items-center mr-2">
          <b-icon
            icon="arrow-repeat"
            width="25"
            height="25"
            class="mr-1"
          />

          <b-icon
            icon="bell-fill"
            width="25"
            height="25"
          />
        </div>
        <!-- END - Icon group -->

        <!-- START - Profile -->
        <div class="d-flex flex-row align-items-center mr-2">
          <b-nav-text class="text-capitalize mr-1 font-weight-bold text-dark">
            Ngô Thị Lan hương
          </b-nav-text>

          <img
            src="../../../../assets/images/icons/profile.png"
            width="35"
            height="35"
            class="mr-1 bg-info rounded-circle"
          >
        </div>
        <!-- END - Profile -->
      </b-navbar-nav>
    </b-navbar>
    <!-- END - NavBar -->

    <!-- START - Nav -->
    <b-nav
      class="d-flex flex-row align-items-center bg-info"
    >
      <b-nav-item class="mx-2">
        <b-icon
          icon="gear-fill"
          width="25"
          height="25"
          color="white"
          class="mr-1"
        />
        <b-nav-text class="text-white">
          Hệ thống
        </b-nav-text>
      </b-nav-item>
      <b-nav-item class="mx-2">
        <b-icon
          icon="cart-fill"
          width="25"
          height="25"
          color="white"
          class="mr-1"
        />
        <b-nav-text class="text-white">
          Bán hàng
        </b-nav-text>
      </b-nav-item>
      <b-nav-item class="mx-2">
        <b-icon
          icon="cart-fill"
          width="25"
          height="25"
          color="white"
          class="mr-1"
        />
        <b-nav-text class="text-white">
          Mua hàng
        </b-nav-text>
      </b-nav-item>
      <b-nav-item class="mx-2">
        <b-icon
          icon="archive-fill"
          width="25"
          height="25"
          color="white"
          class="mr-1"
        />
        <b-nav-text class="text-white">
          Kho
        </b-nav-text>
      </b-nav-item>
      <b-nav-item class="mx-2">
        <b-icon
          icon="graph-up"
          width="25"
          height="25"
          color="white"
          class="mr-1"
        />
        <b-nav-text class="text-white">
          Báo cáo
        </b-nav-text>
      </b-nav-item>
    </b-nav>
    <!-- END - Nav -->

  </div>
</template>

<script>
export default {
  name: 'AppNavbar',
}
</script>

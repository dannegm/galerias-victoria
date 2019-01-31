<template>
    <footer>
        <div class="container">
            <div class="footer-showroom">
                <div class="row">
                    <div class="col-sm-8">
                        <h2>Visita nuestra galería</h2>
                        <p v-html="location.address"></p>
                    </div>
                    <div class="col-sm-4 text-center">
                        <a href="/contact" class="btn btn-clean"><span class="icon icon-map-marker"></span> Ubicación</a>
                        <div class="call-us h4"><span class="icon icon-phone-handset"></span> {{ contact.phones.one | phone }}</div>
                    </div>
                </div>
            </div>

            <div class="footer-links">
                <div class="row">
                    <div class="col-sm-4 col-md-2">
                        <h5>Categorías</h5>
                        <ul>
                            <li><a href="/products">Muebles</a></li>
                            <li><a href="/products">Esculturas</a></li>
                            <li><a href="/products">Pinturas</a></li>
                            <li><a href="/products">Arte Sacro</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-4 col-md-2">
                        <h5>...</h5>
                        <ul>
                            <li><a href="/products">Porcelana</a></li>
                            <li><a href="/products">Plata</a></li>
                            <li><a href="/products">Adornos</a></li>
                            <li><a href="/products">Marfil</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-4 col-md-2">
                        <h5>Galería</h5>
                        <ul>
                            <li><a href="/about">Nosotros</a></li>
                            <li><a href="/contact">Contacto</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <h5>Suscríbete a nuestro newsletter</h5>
                        <div class="form-group form-newsletter">
                            <input class="form-control" type="text" name="email" value="" placeholder="Email address" />
                            <input type="submit" class="btn btn-clean btn-sm" value="Subscribe" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer-social">
                <div class="row">
                    <div class="col-sm-12">
                        Galerías Victoria &nbsp; |  &nbsp; Todos los derechos Reservados 2018 &nbsp; | &nbsp; <a href="#">Aviso de Privacidad</a> &nbsp; | &nbsp; Diseño Web
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    props: [
        'routes',
        'contact',
        'location'
    ],
}
</script>

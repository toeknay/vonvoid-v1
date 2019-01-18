<template lang="html">
    <div class="container mt-5 mb-3">
        <div class="row">
            <div class="card col-8 offset-2">
                <div class="card-body row">
                    <div class="col-sm-2">
                        <i class="fas fa-exclamation-circle text-danger mb-3" style="font-size:75px;"></i>
                    </div>
                    <div class="col-sm-10">
                        <h1><strong>Oops!</strong> Website Unavailable.</h1>
                        <h5 class="text-muted">
                            It looks like this website is unavailable in your country due to regulatory issues.
                            We're sorry for the inconvenience!
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'unavailable'
}
</script>

<style lang="css">
</style>

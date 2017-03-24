
<template>
  <section id="content">
    <section class="vbox">
      <section class="scrollable padder">
        <ul class="breadcrumb no-border no-radius b-b b-light pull-in">
          <li><a href="index.html"><i class="fa fa-home"></i> Home</a></li>
          <li><a href="#">UI kit</a></li>
          <li><a href="#">Form</a></li>
          <li class="active">Form wizard</li>
        </ul>
        <div class="m-b-md">
          <h3 class="m-b-none">Form wizard</h3>
        </div>
        <div class="panel panel-default">
          <div class="wizard clearfix" id="form-wizard">
            <ul class="steps">
              <li data-target="#step1" class="active"><span class="badge badge-info">1</span>Step 1</li>
              <li data-target="#step2"><span class="badge">2</span>Step 2</li>
              <li data-target="#step3"><span class="badge">3</span>Step 3</li>
            </ul>
          </div>
          <div class="step-content">
            <form>
              <div class="step-pane active" id="step1">
                <p>Your website:</p>
                <input type="text" class="form-control" data-trigger="change" data-required="true" data-type="url" placeholder="website">
              </div>
              <div class="step-pane" id="step2">
                <p>Your email:</p>
                <input type="text" class="form-control" data-trigger="change" data-required="true" data-type="email" placeholder="email address">
              </div>
              <div class="step-pane" id="step3">This is step 3</div>
            </form>
            <div class="actions m-t">
              <button type="button" class="btn btn-default btn-sm btn-prev" data-target="#form-wizard" data-wizard="previous" disabled="disabled">Prev</button>
              <button type="button" class="btn btn-default btn-sm btn-next" data-target="#form-wizard" data-wizard="next" data-last="Finish">Next</button>
            </div>
          </div>
        </div>
      </section>
    </section>
    <a href="#" class="hide nav-off-screen-block" data-toggle="class:nav-off-screen" data-target="#nav"></a> </section>
</template>

<script>
  export default{
    data () {
      return {}
    },
    components: {},
    watch: {},
    methods: {},
    created () {

    }
  }
</script>
